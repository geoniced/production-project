import { Notification } from "entities/Notification/model/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Уведомление 1",
    description: "Произошло событие 1",
    userId: "1",
  },
  {
    id: "2",
    title: "Уведомление 2",
    description: "Произошло событие 2",
    userId: "1",
    href: "http://localhost:3000/admin",
  },
  {
    id: "3",
    title: "Уведомление 3",
    description: "Произошло событие 3",
    userId: "1",
    href: "http://localhost:3000/admin",
  },
  {
    id: "4",
    title: "Уведомление 4",
    description: "Произошло событие 4",
    userId: "1",
  },
];
