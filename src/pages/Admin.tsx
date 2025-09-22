// src/pages/Admin.tsx
import CreateMarketForm from "@/components/admin/CreateMarketForm"; // Import the new form

const Admin = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage markets and platform settings.</p>
        </div>

        {/* Replace the placeholder with the actual form */}
        <CreateMarketForm />
      </div>
    </div>
  );
};

export default Admin;