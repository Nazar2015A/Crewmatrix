import { ItemsForm } from "@/components/items/ItemsForm";

const App = () => {
  return (
    <main className="min-h-screen bg-background p-4 md:p-6">
      <div className="flex justify-center mx-auto max-w-4xl">
        <ItemsForm />
      </div>
    </main>
  );
};

export default App;
