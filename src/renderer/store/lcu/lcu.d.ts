declare interface LCUState extends Partial<LockfileData> {
  protocol?: string;
  address?: string;
  username: 'riot';
  summoner?: string;
}
