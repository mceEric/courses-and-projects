import { useRouter } from "next/router";
import StandardButton from "../../shared/buttons/StandardButton";
import Image from "next/image";
import getColors from "../../../utils/getColor";

function RoleItem({ title, description, url, image, dataCy }) {
  const router = useRouter();
  const colors = getColors(false);

  return (
    <div className="center-content flex-1 w-full lg:w-auto lg:h-full h-auto min-w-[16em] flex-col p-0 lg:m-4 m-0 my-4 rounded-md border-2 border-violet-700">
      <div className="center-content flex-col p-4">
        <div className="w-[45%] mt-4 mb-auto">
          <Image src={image} alt="Test metrics" />
        </div>
      </div>
      <div className="center-content w-full flex-col mt-auto">
        <h2 className="text-2xl mt-auto text-violet-700 font-medium">
          {title}
        </h2>
        <p className="text-center text-gray-400 text-lg w-[75%]">
          {description}
        </p>
        <StandardButton
          key={title}
          message={title}
          dataCy={dataCy}
          handleClick={() => router.replace(url)}
          extraClasses={"w-full mt-6 m-0 p-2 rounded-t-none rounded-sm"}
          colors={colors}
        />
      </div>
    </div>
  );
}

export default RoleItem;
