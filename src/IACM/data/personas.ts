export interface Persona {
  id: string; icon: string; name: string; roles: string
  color: string; bg: string; bdr: string
  cares: string[]; metrics: string[]; pains: string[]
  qs: string[]; benefits: string[]
}

export const PERSONAS: Persona[] = []
