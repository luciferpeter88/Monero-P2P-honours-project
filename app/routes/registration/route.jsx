export default function Index() {
  if (typeof window === "undefined") {
    console.log("Registration route - running on the server");
  }
  return <h1>Registration route</h1>;
}
