// src/lib/auth.ts

// IMPORTANT: Addresses have been converted to lowercase for correct matching.
const ADMIN_WALLETS = [
  "0xf9cad870aa579dd5932f294ec833ca419d46b4bc",
];

const CREATOR_WALLETS = [
  "0xf9cad870aa579dd5932f294ec833ca419d46b4bc",
];

const VALIDATOR_WALLETS = [
  "0xf9cad870aa579dd5932f294ec833ca419d46b4bc",
];

const RESOLVER_WALLETS = [
  "0xf9cad870aa579dd5932f294ec833ca419d46b4bc",
];

/**
 * Checks if a connected wallet address has admin privileges.
 * In this simple setup, anyone with any special role is considered an "admin" for UI access.
 * @param address The wallet address to check.
 * @returns True if the user has any administrative role, false otherwise.
 */
export const isAdmin = (address: string | undefined): boolean => {
  if (!address) return false;
  const lowercasedAddress = address.toLowerCase();
  
  // Create a new array of all admin addresses, also converted to lowercase.
  const allAdmins = [
    ...ADMIN_WALLETS.map(addr => addr.toLowerCase()), 
    ...CREATOR_WALLETS.map(addr => addr.toLowerCase()), 
    ...VALIDATOR_WALLETS.map(addr => addr.toLowerCase()), 
    ...RESOLVER_WALLETS.map(addr => addr.toLowerCase())
  ];
  
  // Use a Set for more efficient lookups.
  const adminSet = new Set(allAdmins);
  
  return adminSet.has(lowercasedAddress);
};