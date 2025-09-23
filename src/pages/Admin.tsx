// src/pages/Admin.tsx
import CreateMarketForm from "@/components/admin/CreateMarketForm";
import ValidateMarketList from "@/components/admin/ValidateMarketList"; // 1. Import the new component

const Admin = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage markets and platform settings.</p>
        </div>

        <CreateMarketForm />
        
        {/* 2. Add the validation list component */}
        <ValidateMarketList />
      </div>
    </div>
  );
};

export default Admin;