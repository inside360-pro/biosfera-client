import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ContentPage from "./ContentPage";
import fetchData from "@/app/utils/fetchData";

export const metadata = {
  title: "Биосфера ДВ | Контакты",
  description: "Контакты для сайта Биосфера ДВ",
};

const GLOBAL_API_URL = "/api/global";

type ContactsGlobal = {
  phone?: string;
  email?: string;
  address?: string;
  weekday_schedule?: string;
};

type GlobalApiResponse = {
  data?: { attributes?: ContactsGlobal } | ContactsGlobal;
};

export default async function Contacts() {
  let phone: string | undefined;
  let email: string | undefined;
  let address: string | undefined;
  let weekday_schedule: string | undefined;

  try {
    const response = await fetchData<GlobalApiResponse>(GLOBAL_API_URL);
    const d = response?.data;
    const data =
      d && typeof d === "object" && "attributes" in d
        ? (d as { attributes?: ContactsGlobal }).attributes
        : (d as ContactsGlobal | undefined);

    phone = data?.phone;
    email = data?.email;
    address = data?.address;
    weekday_schedule = data?.weekday_schedule;
  } catch (error) {
    console.error("Ошибка при загрузке /api/global:", error);
  }

  return (
    <div className="container">
      <Breadcrumbs secondLabel="Контакты" />
      <ContentPage
        phone={phone}
        email={email}
        address={address}
        weekday_schedule={weekday_schedule}
      />
    </div>
  );
}
