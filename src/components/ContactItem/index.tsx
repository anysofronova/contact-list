import { FC, useState } from "react";
import { Edit, PersonDelete } from "@styled-icons/evaicons-solid";

import { Contact } from "../../@types";
import { ModalAddContact } from "../Header";
import { useAppDispatch } from "../../hooks";
import style from "./ContactItem.module.scss";
import { deleteContact } from "../../redux/slices/contactsSlice";

export const ContactItem: FC<Contact> = ({ name, email, phone, id }) => {
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const deleteItem = () => dispatch(deleteContact(id));
  return (
    <div className={style.contact}>
      <div className={style.name}>{name}</div>
      <div className={style.phone}>{phone}</div>
      <div className={style.email}>{email}</div>
      <div className={style.buttons}>
        <button className={"icon"} onClick={() => setModal(true)}>
          <Edit />
        </button>
        <button className={"icon"} onClick={() => deleteItem()}>
          <PersonDelete />
        </button>
      </div>
      {modal && (
        <ModalAddContact
          setModal={setModal}
          title={"Change a contact"}
          contact={{ name, phone, email, id }}
        />
      )}
    </div>
  );
};
