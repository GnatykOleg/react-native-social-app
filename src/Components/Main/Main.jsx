import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../../router";

import { auth } from "../../firebase/config";

import { onAuthStateChanged } from "firebase/auth";

import { getAuthSelector } from "../../redux/auth/authSelectors";

import { authStateChangeUser } from "../../redux/auth/authOperations";
export default function Main() {
  const dispatch = useDispatch();

  const { stateChange } = useSelector(getAuthSelector);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          authStateChangeUser({ uid, displayName, email, stateChange: true })
        );
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
