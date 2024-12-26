export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type HabitType = {
  _id?: string;
  title: string;
  frequency: number;
  duration: number;
  description: string;
  completed: number;
  completedDates: [
    {
      dates: Date;
      isSkipped: Boolean;
      status: Boolean;
    },
  ];
};
