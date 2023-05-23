import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://www.istockphoto.com/photo/asian-indian-male-white-collar-worker-with-disability-on-wheelchair-talking-to-the-gm1319810505-406568010"
      title="First Meetup"
      address="Some address"
      description="some description"
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb://localhost:27017/nextjs");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect("mongodb://localhost:27017/nextjs");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetail;
