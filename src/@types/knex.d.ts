// eslint-disable-next-line
import { Knex } from 'knex' // não irei usar a variável knex, isso é so uma forma de eu dizer que vou reaproveitar todos os tipos que existem dentro do next e irei adicionar alguns novos

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
