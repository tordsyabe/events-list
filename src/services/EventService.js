import firebase from "../firebase";

export const saveEvent = event => {
  if (event.eventId !== "") {
    return firebase
      .firestore()
      .collection("events")
      .doc(event.eventId)
      .set(event);
  }
  return firebase
    .firestore()
    .collection("events")
    .add(event);
};

export const updateEVent = event => {
  return firebase
    .firestore()
    .collection(event)
    .doc(event.id)
    .set(event);
};

export const deleteEvent = id => {
  return firebase
    .firestore()
    .collection("events")
    .doc(id)
    .delete();
};
