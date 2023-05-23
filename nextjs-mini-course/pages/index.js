import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function Home(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb://localhost:27017/nextjs");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Home;
