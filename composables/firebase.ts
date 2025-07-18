import type { LoginInterface, RecoveryInterface, RegisterInterface } from '~/interfaces'
import { browserLocalPersistence, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, doc, updateDoc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { Person } from '~/classes'

export const useFirebase = () => {
  const { $auth, $firestore } = useNuxtApp()
  const firebaseStore = useMyFirebaseStore()
  const { t } = useI18n()

  const tableUser: string = 'users'
  const collectionRefUser = collection($firestore, tableUser)


  const errorLog = (error: unknown, message: string | null = null) => {
    if (error instanceof Error) {
      return error.message.toString()
    } else if (message) {
      return message
    } else {
      return 'ko'
    }
  }

  const createPersonDetails = async (user: RegisterInterface, uid: string) => {
    try {
      const person: Person = new Person()
      person.name = user.name
      person.user = uid
      const plainPerson = JSON.parse(JSON.stringify(person)) // serve perchè firestore non prende le classi come input
      const document = await addDoc(
        collectionRefUser,
        plainPerson
      )
      const documentRef = doc($firestore, tableUser, document.id)
      try {
        await updateDoc(documentRef, { doc: document.id })
        return 'ok'
      } catch (error: unknown) {
        return errorLog(error)
      }
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const setDataFirebase = async (user: any) => {
    firebaseStore.setUser(user)
    const queryRef = query(
      collection($firestore, tableUser),
      where('user', '==', user.uid),
    )
    try {
      const docs = await getDocs(queryRef)
      if (docs.docs.length > 0) {
        firebaseStore.setPerson(docs.docs[0].data())
        return 'ok'
      } else {
        return errorLog(null, t('error.not_person_find'))
      }
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const login = async (user: LoginInterface) => {
    try {
      await setPersistence($auth, browserLocalPersistence)
      const data = await signInWithEmailAndPassword($auth, user.email, user.password)
      if (data && data.user.emailVerified) {
        return await setDataFirebase(data.user)
      } else {
        return errorLog(null, t('error.not_login_not_verified'))
      }
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const logout = async () => {
    try {
      await signOut($auth)
      return 'ok'
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const registrer = async (user: RegisterInterface) => {
    try {
      const data = await createUserWithEmailAndPassword($auth, user.email, user.password)
      if (data) {
        await sendEmailVerification(data.user)
        return await createPersonDetails(user, data.user.uid)
      } else {
        return errorLog(null, t('error.not_create'))
      }
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const recovery = async (user: RecoveryInterface) => {
    try {
      await sendPasswordResetEmail($auth, user.email)
      return 'ok'
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  const updatePerson = async (id: string, data: any) => {
    try {
      const documentRef = doc($firestore, tableUser, id)
      await updateDoc(documentRef, data)
      try {
        const doc = await getDoc(documentRef)
        if (doc) {
          firebaseStore.setPerson(doc.data())
        } else {
          return errorLog(null, t('error.not_get_data_person'))
        }
      } catch (error: unknown) {
        return errorLog(error)
      }
      return 'ok'
    } catch (error: unknown) {
      return errorLog(error)
    }
  }

  return {
    login,
    logout,
    registrer,
    recovery,
    updatePerson
  }
}
