import { IActivity } from "./models.activity"
import { IClient } from "./models.client"

export interface IRating {
  _id: string
  name: string
  text: string
  score: number
  activity: IActivity
  client: IClient
  createdAt: Date
  updatedAt: Date
}