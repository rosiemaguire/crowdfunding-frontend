import { useParams } from "react-router-dom";
import useMyPledges from "../../hooks/use-mypledges";
import isMyPledge from "../../components/functions/isMyPledge";
import NotFound404Page from "../../components/NotFound404Page/NotFound404Page";
import PledgeUpdateForm from "../../components/PledgeUpdateForm/PledgeUpdateForm";

function PledgeUpdatePage() {
  const { id } = useParams();
  const [myPledges] = useMyPledges();


  if(!isMyPledge(myPledges,Number(id))) {
    return <NotFound404Page/>
  }
  return <PledgeUpdateForm />
}

export default PledgeUpdatePage;