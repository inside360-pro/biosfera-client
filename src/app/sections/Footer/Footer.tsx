import fetchData from "@/app/utils/fetchData";
import FooterClient, { type FooterClientProps } from "./FooterClient";

const GLOBAL_API_URL = "/api/global";

type GlobalApiResponse = {
  data?: { attributes?: FooterClientProps } | FooterClientProps;
};

export default async function Footer() {
  let phone: string | undefined;
  let email: string | undefined;
  let address: string | undefined;
  let weekday_schedule: string | undefined;

  try {
    const response = await fetchData<GlobalApiResponse>(GLOBAL_API_URL);
    const d = response?.data;
    const data =
      d && typeof d === "object" && "attributes" in d
        ? (d as { attributes?: FooterClientProps }).attributes
        : (d as FooterClientProps | undefined);

    phone = data?.phone;
    email = data?.email;
    address = data?.address;
    weekday_schedule = data?.weekday_schedule;
  } catch (error) {
    console.error("Ошибка при загрузке /api/global:", error);
  }

  return (
    <FooterClient
      phone={phone}
      email={email}
      address={address}
      weekday_schedule={weekday_schedule}
    />
  );
}
