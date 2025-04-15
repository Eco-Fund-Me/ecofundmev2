import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Veriff: any; // Declare Veriff on the global window object
    veriffSDK: any;
  }
}

interface KycVerificationCardProps {
  kycStatus?: string
  user: string
  onVerificationComplete?: () => void
}

const VeriffVerification = ({ user}: KycVerificationCardProps) => {
  const veriffRootRef = useRef(null);

  useEffect(() => {
    // Function to load scripts dynamically
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
      script.onerror = () => reject(new (window as any).Error(`Failed to load ${src}`));

        document.body.appendChild(script);
      });
    };

    // Load Veriff SDK scripts
    Promise.all([
      loadScript("https://cdn.veriff.me/sdk/js/1.5/veriff.min.js"),
      loadScript("https://cdn.veriff.me/incontext/js/v1/veriff.js"),
    ])
      .then(() => {
        if (window.Veriff) {
          const veriff = window.Veriff({
            host: "https://stationapi.veriff.com",
            apiKey: process.env.NEXT_PUBLIC_VERIFF_API_KEY!, 
            parentId: "veriff-root",
            onSession: (err: any, response:any) => {
              if (!err) {
                window.veriffSDK.createVeriffFrame({ url: response.verification.url });
              }
            },
          });

          veriff.setParams({
            vendorData: user,
          });

          veriff.mount();
        }
      })
      .catch((error) => {
        console.error("Error loading Veriff scripts:", error);
      });

    return () => {
      // Cleanup if needed
    };
  }, [user]);

  return <div id="veriff-root" ref={veriffRootRef}></div>;
};

export default VeriffVerification;