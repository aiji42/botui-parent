import { Line } from 'rc-progress';

const ProgressBar = ({ percent }) => (
  <Line percent={percent}
    strokeWidth="3" strokeColor="#0f84fe"
    trailWidth="3"
  />
)

export default ProgressBar