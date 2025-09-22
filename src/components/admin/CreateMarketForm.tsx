import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi";
import { parseEther, maxUint256, erc20Abi } from "viem";
import { policastMarketV3Address, policastMarketV3Abi } from "@/lib/contract";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Zod schema for form validation
const formSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  description: z.string().min(10, "Description is required"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 2 is required"),
  duration: z.coerce.number().positive("Duration must be a positive number of hours"),
  category: z.coerce.number().min(0, "Category is required"),
  initialLiquidity: z.coerce.number().positive("Initial liquidity must be positive"),
  earlyResolutionAllowed: z.boolean().default(false),
});

const CreateMarketForm = () => {
  const { address } = useAccount();
  
  // Wagmi hooks for writing to contracts
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      description: "",
      option1: "Yes",
      option2: "No",
      duration: 24,
      category: 6, // Default to OTHER
      initialLiquidity: 100,
      earlyResolutionAllowed: false,
    },
  });

  // 1. Get the address of the betting token from our market contract
  const { data: bettingTokenAddress } = useReadContract({
    address: policastMarketV3Address,
    abi: policastMarketV3Abi,
    functionName: 'getBettingToken', // Assuming your contract has a getter for the token
    watch: true,
  });

  // 2. Check the user's current token allowance for our market contract
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: bettingTokenAddress as `0x${string}` | undefined,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, policastMarketV3Address],
    enabled: !!address && !!bettingTokenAddress, // Only run the query when we have the necessary addresses
  });

  // 3. Determine if an approval is needed
  const liquidityAmount = form.watch('initialLiquidity');
  const needsApproval = allowance !== undefined && allowance < parseEther(liquidityAmount > 0 ? liquidityAmount.toString() : '0');

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // If approval is needed, the button triggers the approve transaction
    if (needsApproval) {
      toast.info("Please approve the token spending limit in your wallet.");
      writeContract({
        address: bettingTokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [policastMarketV3Address, maxUint256], // Approve a very large amount for convenience
      });
      return; // Stop execution here until approval is done
    }
    
    // If approval is sufficient, the button triggers the createMarket transaction
    writeContract({
      address: policastMarketV3Address,
      abi: policastMarketV3Abi,
      functionName: "createMarket",
      args: [
        values.question,
        values.description,
        [values.option1, values.option2],
        ["", ""], // optionDescriptions (can be added to form later)
        BigInt(values.duration * 3600), // Convert hours to seconds
        values.category,
        0, // marketType (0 = PAID)
        parseEther(values.initialLiquidity.toString()),
        values.earlyResolutionAllowed,
      ],
    });
  }
  
  // Effect for handling toast notifications based on transaction status
  useEffect(() => {
    if (isPending) {
        toast.loading("Please check your wallet...");
    }
    if (isConfirming) {
      toast.loading("Transaction is confirming...");
    }
    if (isConfirmed) {
      // Check which action was just confirmed
      if (needsApproval) {
        toast.success("Approval successful! You can now create the market.");
        refetchAllowance(); // IMPORTANT: Refetch the allowance to update the button's state
      } else {
        toast.success("Market created successfully!", {
          description: `Transaction Hash: ${hash}`,
          action: { label: "View on Explorer", onClick: () => window.open(`https://sepolia.basescan.org/tx/${hash}`, '_blank') },
        });
        form.reset(); // Reset form after successful market creation
      }
    }
    if (error) {
      toast.error("Transaction failed", {
        description: error.message,
      });
    }
  }, [isPending, isConfirming, isConfirmed, error, hash, form, needsApproval, refetchAllowance]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Market</CardTitle>
        <CardDescription>Fill out the details below to launch a new prediction market.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="question" render={({ field }) => (
              <FormItem><FormLabel>Question</FormLabel><FormControl><Input placeholder="e.g., Will ETH reach $5,000 by the end of the year?" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the market resolution criteria..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="option1" render={({ field }) => (
                <FormItem><FormLabel>Option 1</FormLabel><FormControl><Input placeholder="Yes" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="option2" render={({ field }) => (
                <FormItem><FormLabel>Option 2</FormLabel><FormControl><Input placeholder="No" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <FormField control={form.control} name="duration" render={({ field }) => (
                <FormItem><FormLabel>Duration (hours)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Category</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="0">POLITICS</SelectItem>
                      <SelectItem value="1">SPORTS</SelectItem>
                      <SelectItem value="2">CRYPTO</SelectItem>
                      <SelectItem value="3">ENTERTAINMENT</SelectItem>
                      <SelectItem value="4">TECH</SelectItem>
                      <SelectItem value="5">FINANCE</SelectItem>
                      <SelectItem value="6">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                <FormMessage /></FormItem>
              )} />
            </div>
             <FormField control={form.control} name="initialLiquidity" render={({ field }) => (
              <FormItem><FormLabel>Initial Liquidity (Tokens)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="earlyResolutionAllowed" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5"><FormLabel>Allow Early Resolution</FormLabel></div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )} />
            
            <Button type="submit" disabled={isPending || isConfirming} className="w-full">
              {isPending || isConfirming 
                ? 'Processing...' 
                : needsApproval 
                ? `Approve ${liquidityAmount} Tokens` 
                : 'Create Market'}
            </Button>
            {hash && <div className="text-sm text-center text-muted-foreground break-all pt-2">Tx: {hash}</div>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateMarketForm;