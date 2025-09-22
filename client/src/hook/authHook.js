import { getStart, getStudents } from "../features/slice/studentSlice";
import { axiosInstance } from "../lib/axios";
import { useDispatch } from "react-redux";

const useStudentActions = () => {
  const dispatch = useDispatch();

  const AllStudent = async (e) => {
    if (e && e.preventDefault) e.preventDefault(); // fix typo and support optional event
    try {
      dispatch(getStart());
      const res = await axiosInstance.get('students');
      dispatch(getStudents({ students: res?.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const getNewStudent = async () => {
    try {
      dispatch(getStart());
      const res = await axiosInstance.get("new_student");
      dispatch(getStudents({ newstudents: res?.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return { AllStudent, getNewStudent };
};

export default useStudentActions;
