import useSelf from "../../hooks/use-self";

function UserPage() {
  
  const { self, isLoading, error } = useSelf();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <article className="article">
      <h1>Hi {`${self.first_name}${self.last_name}` ?`${self.first_name} ${self.last_name}`: self.username }!</h1>
      <p>More profile info coming soon!</p>
    </article>
  );
}

export default UserPage;
