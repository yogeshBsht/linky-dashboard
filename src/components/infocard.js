import Card from "react-bootstrap/Card";

export default function Infocard({title, infoDescription,value}) {
    return (
    <Card
      bg={"Light".toLowerCase()}
      key={"Light"}
      text={"Light".toLowerCase() === "light" ? "dark" : "white"}
      style={{ width: "20rem" }}
      className="mb-3"
    >
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>{value} </Card.Title>
        <Card.Text>{infoDescription}</Card.Text>
      </Card.Body>
    </Card>
  );
}