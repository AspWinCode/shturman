export interface EmergencyContact {
  label: string;
  number: string;
}

export const EMERGENCY_CONTACTS: Record<string, EmergencyContact[]> = {
  russia: [
    { label: 'Единый', number: '112' },
    { label: 'Скорая', number: '103' },
    { label: 'Полиция', number: '102' },
    { label: 'Пожарная', number: '101' },
  ],
  turkey: [
    { label: 'Экстренный', number: '112' },
    { label: 'Полиция', number: '155' },
    { label: 'Скорая', number: '112' },
  ],
  thailand: [
    { label: 'Экстренный', number: '191' },
    { label: 'Скорая', number: '1669' },
    { label: 'Турполиция', number: '1155' },
  ],
  uae: [
    { label: 'Экстренный', number: '999' },
    { label: 'Скорая', number: '998' },
    { label: 'Пожарная', number: '997' },
  ],
  kazakhstan: [
    { label: 'Экстренный', number: '112' },
    { label: 'Скорая', number: '103' },
    { label: 'Полиция', number: '102' },
  ],
};

export function getEmergencyContacts(country?: string): EmergencyContact[] {
  if (!country) return EMERGENCY_CONTACTS.russia;
  const normalized = country.trim().toLowerCase();
  if (normalized.includes('рос')) return EMERGENCY_CONTACTS.russia;
  if (normalized.includes('тур')) return EMERGENCY_CONTACTS.turkey;
  if (normalized.includes('thai') || normalized.includes('таил')) return EMERGENCY_CONTACTS.thailand;
  if (normalized.includes('uae') || normalized.includes('оаэ')) return EMERGENCY_CONTACTS.uae;
  if (normalized.includes('каз')) return EMERGENCY_CONTACTS.kazakhstan;
  return EMERGENCY_CONTACTS.russia;
}
