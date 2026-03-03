/**
 * Нормализует телефон к формату для tel: ссылки
 * Пример: "+7 423 241-35-14" → "+74232413514"
 */
export const normalizePhoneForTel = (phone: string): string => {
    if (!phone) return "";
  
    // 1. Удаляем всё, кроме цифр и плюса
    const cleaned = phone.replace(/[^\d+]/g, "");
  
    // 2. Убираем ведущий плюс для проверки кода страны
    const digitsOnly = cleaned.replace("+", "");
  
    // 3. Обрабатываем код страны
    let normalized = digitsOnly;
    
    if (normalized.startsWith("7") && normalized.length > 10) {
      // Уже есть код 7 (например, 7423...), оставляем как есть
      normalized = normalized;
    } else if (normalized.startsWith("8") && normalized.length > 10) {
      // Заменяем 8 на 7 (российский код)
      normalized = "7" + normalized.slice(1);
    } else if (normalized.length === 10) {
      // Нет кода страны, добавляем 7
      normalized = "7" + normalized;
    }
  
    // 4. Возвращаем с плюсом
    return `+${normalized}`;
  };
  

  export const createTelLink = (phone: string): string => {
    const normalized = normalizePhoneForTel(phone);
    return `tel:${normalized}`;
  };