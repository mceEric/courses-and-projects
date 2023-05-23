import { useEffect, useState } from "react";
import { getStudies } from "../../../../../services/StudyService";
import StudyCardItem from "../study-card-item/StudyCardItem";
import StudyEnlargedItem from "./study-enlarged-item/StudyEnlargedItem";
import { Oval } from "react-loader-spinner";

function AllStudiesPage({ user, setUser, colors, isComponentTest }) {
  const [enlargedStudyOpen, setEnlargedStudyOpen] = useState(null);
  const [enlargedStudy, setEnlargedStudy] = useState(null);
  const [studies, setStudies] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      const allStudies = await getStudies();
      setStudies(allStudies);
    };

    fetchStudies();
  }, []);

  const isTest = isComponentTest ? false : window.Cypress ? true : false;

  return (
    <div
      className={`w-full h-full center-content mt-12 md:mt-0 ${colors.secondary.bg}`}
    >
      {studies ? (
        <div>
          {studies.map((study, i) => {
            return (
              <StudyCardItem
                key={i}
                study={study}
                setStudyOpen={setEnlargedStudyOpen}
                setStudy={setEnlargedStudy}
                colors={colors}
              />
            );
          })}
          <StudyEnlargedItem
            user={user}
            setUser={setUser}
            study={enlargedStudy}
            enlargedStudyOpen={enlargedStudyOpen}
            setEnlargedStudyOpen={setEnlargedStudyOpen}
            setEnlargedStudy={setEnlargedStudy}
            colors={colors}
            isTest={isTest}
          />
        </div>
      ) : (
        <Oval
          height={100}
          width={100}
          color="#6D28D9"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </div>
  );
}

export default AllStudiesPage;
