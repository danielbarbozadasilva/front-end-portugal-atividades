import { configureStore } from '@reduxjs/toolkit'
import ActivitySlice from './activity/activity.reducer'
import AgentSlice from './agent/agent.reducer'
import AuditLogSlice from './auditlog/auditlog.reducer'
import SignReducer from './auth/auth.reducer'
import ClientReducer from './client/client.reducer'
import UserSlice from './user/user.reducer'
import RatingMethodSlice from './rating/rating.reducer'
import OrderSlice from './order/order.reducer'
import ContentPageSlice from './contentPage/contentPage.reducer'
import GroupSlice from './group/group.reducer'
import PaymentSlice  from './payment/payment.reducer'
import PaymentMethodSlice from './paymentMethod/paymentMethod.reducer'
import SolicitationCartItemSlice from './solicitationCart/solicitationCart.reducer'
import SolicitationReducer from './solicitation/solicitation.reducer'

const store = configureStore({
  reducer: {
    activity: ActivitySlice,
    agent: AgentSlice,
    auditLog: AuditLogSlice,
    auth: SignReducer,
    client: ClientReducer,
    containtPage: ContentPageSlice,
    group: GroupSlice,
    order: OrderSlice,
    payment: PaymentSlice,
    paymentMethod: PaymentMethodSlice,
    rating: RatingMethodSlice,
    solicitation: SolicitationReducer,
    solicitationCart: SolicitationCartItemSlice,
    user: UserSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
