
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { EcoFundMeMatrixClient, MatrixUser } from "@/lib/matrix-client";
// import {
//   loadMatrixToken,
//   loadMatrixUserId,
//   storeMatrixToken,
//   storeMatrixUserId,
//   removeAllMatrixStorage,
// } from "@/utils/local";

// interface MatrixContextType {
//   client: EcoFundMeMatrixClient | null;
//   user: MatrixUser | null;
//   isConnected: boolean;
//   isLoading: boolean;
//   login: (userId: string) => Promise<void>;
//   logout: () => void;
//   openLoginModal: () => void;
// }

// const MatrixContext = createContext<MatrixContextType | null>(null);

// export const useMatrixContext = () => {
//   const ctx = useContext(MatrixContext);
//   if (!ctx) throw new Error("useMatrixContext must be used within MatrixProvider");
//   return ctx;
// };

// export const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
//   const [client, setClient] = useState<EcoFundMeMatrixClient | null>(null);
//   const [user, setUser] = useState<MatrixUser | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     const autoLogin = async () => {
//       const token = loadMatrixToken();
//       const userId = loadMatrixUserId();
//       if (!token || !userId) {
//         setIsConnected(false);
//         setIsLoading(false);
//         return;
//       }

//       const newClient = new EcoFundMeMatrixClient({
//         baseUrl: "https://chat.ecofundme.com",
//         accessToken: token,
//         userId,
//       });

//       const result = await newClient.initialize();
//       if (result.success) {
//         setClient(newClient);
//         setIsConnected(true);
//         const userInfo = await newClient.getUser();
//         setUser(userInfo.data ?? null);
//       }
//       setIsLoading(false);
//     };

//     autoLogin();
//   }, []);

//   const login = useCallback(async (userId: string) => {
//     const res = await fetch("/api/social/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId }),
//     });

//     const { access_token, user_id } = await res.json();
//     storeMatrixToken(access_token);
//     storeMatrixUserId(user_id);

//     const newClient = new EcoFundMeMatrixClient({
//       baseUrl: "https://chat.ecofundme.com",
//       accessToken: access_token,
//       userId: user_id,
//     });

//     const result = await newClient.initialize();
//     if (result.success) {
//       setClient(newClient);
//       setIsConnected(true);
//       const userInfo = await newClient.getUser();
//       setUser(userInfo.data ?? null);
//       setShowLoginModal(false);
//     }
//   }, []);

//   const logout = () => {
//     removeAllMatrixStorage();
//     setClient(null);
//     setUser(null);
//     setIsConnected(false);
//   };

//   const openLoginModal = () => setShowLoginModal(true);

//   return (
//     <MatrixContext.Provider
//       value={{ client, user, isConnected, isLoading, login, logout, openLoginModal }}
//     >
//       {children}
//       {showLoginModal && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50">
//           {/* Replace this with your actual <LoginModal /> */}
//           <div className="bg-white p-4 rounded shadow m-auto mt-40 w-[300px] text-center">
//             <p>Please login to continue</p>
//             <button
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//               onClick={() => login("example-user-id")} // replace this
//             >
//               Demo Login
//             </button>
//           </div>
//         </div>
//       )}
//     </MatrixContext.Provider>
//   );
// };

export const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");