import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.scss";
import { ContactItem } from "../../components";
import { useAuth, useAppSelector } from "../../hooks";

export const Home = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    !isAuth && navigate("/login");
  }, [isAuth, navigate]);
  const { searchList } = useAppSelector((state) => state.contactsSlice);
  return (
    <section className={styles.home}>
      <div className={styles.contacts}>
        {searchList?.length === 0 ? (
          <p>No contacts</p>
        ) : (
          searchList?.map((contact) => (
            <ContactItem {...contact} key={contact.id} />
          ))
        )}
      </div>
    </section>
  );
};
