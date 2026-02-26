export default async function fetchData<T = unknown>(url: string): Promise<T> {

  const domain = 'https://api.medflex.ru/';

  if (!domain) {
    throw new Error("NEXT_PUBLIC_API_SERVER не задан");
  }

  const fullUrl = new URL(url, domain).toString();
  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.NEXT_PUBLIC_API_MEDFLEX_TOKEN}`,
      },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`Ошибка http: ${response.status}`);
    }
    const result = (await response.json()) as T; // Type assertion
    return result;
  } catch (error) {
    console.error("Произошла ошибка", error);
    throw error;
  }
}
