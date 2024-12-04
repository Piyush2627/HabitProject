import HabitsPage from "../pages/HabitPage";

function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-900">
      <div className="my-5 w-60 rounded-r-3xl bg-white p-5 opacity-10">
        hello
      </div>
      <div className="grow">
        <div className="mx-auto w-2/5 rounded-b-[90px] bg-white p-2 text-center">
          Links{" "}
        </div>
        <HabitsPage />
      </div>
    </div>
  );
}

export default MainLayout;
