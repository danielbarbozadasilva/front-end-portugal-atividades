import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { ClientAction } from './client.action';
import { IClient } from '../../models/models.index';

export class ClientSlice {
  private clientActionInstance: ClientAction;
  public slice: Slice;

  constructor() {
    this.clientActionInstance = new ClientAction();

    this.slice = createSlice({
      name: 'client',
      initialState: {
        loading: false,
        all: [] as IClient[],
        clientid: {} as IClient,
        error: ''
      },
      reducers: {
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(
            this.clientActionInstance.listAllClientsAction.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            this.clientActionInstance.listAllClientsAction.fulfilled,
            (state, action: PayloadAction<IClient[]>) => {
              state.loading = false;
              state.all = action.payload;
            }
          )
          .addCase(
            this.clientActionInstance.listAllClientsAction.rejected,
            (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch';
            }
          );

        builder
          .addCase(
            this.clientActionInstance.listClientByIdAction.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            this.clientActionInstance.listClientByIdAction.fulfilled,
            (state, action: PayloadAction<IClient>) => {
              state.loading = false;
              state.clientid = action.payload;
            }
          )
          .addCase(
            this.clientActionInstance.listClientByIdAction.rejected,
            (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch';
            }
          );

        builder
          .addCase(
            this.clientActionInstance.createClientAction.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            this.clientActionInstance.createClientAction.fulfilled,
            (state) => {
              state.loading = false;
            }
          )
          .addCase(
            this.clientActionInstance.createClientAction.rejected,
            (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch';
            }
          );

        builder
          .addCase(
            this.clientActionInstance.updateClientAction.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            this.clientActionInstance.updateClientAction.fulfilled,
            (state) => {
              state.loading = false;
            }
          )
          .addCase(
            this.clientActionInstance.updateClientAction.rejected,
            (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch';
            }
          );

        builder
          .addCase(
            this.clientActionInstance.removeClientAction.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            this.clientActionInstance.removeClientAction.fulfilled,
            (state) => {
              state.loading = false;
            }
          )
          .addCase(
            this.clientActionInstance.removeClientAction.rejected,
            (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch';
            }
          );
      }
    });
  }

  public getActions() {
    return this.slice.actions;
  }

  public getClientActions() {
    return this.clientActionInstance;
  }

  public getReducer() {
    return this.slice.reducer;
  }
}

const clientSliceInstance = new ClientSlice();

export const { setError } = clientSliceInstance.getActions();

export const {
  listAllClientsAction,
  listClientByIdAction,
  createClientAction,
  updateClientAction,
  removeClientAction
} = clientSliceInstance.getClientActions();

export default clientSliceInstance.getReducer();
