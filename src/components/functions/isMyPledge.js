export default function isMyPledge(myPledges,pledgeId) {
  const myPledgeIds = [];
  for (let myPledge in myPledges) {
    myPledgeIds.push(myPledges[myPledge]["id"]);
  }
  const isMyPledge = myPledgeIds.includes(pledgeId);
  return isMyPledge
}