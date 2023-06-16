import { EventInterface } from 'interfaces/event';
import { RenamedfunctionInterface } from 'interfaces/renamedfunction';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  event?: EventInterface[];
  Renamedfunction?: RenamedfunctionInterface[];
  user?: UserInterface;
  _count?: {
    event?: number;
    Renamedfunction?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
