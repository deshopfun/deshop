import { ReplyType } from '@/utils/types';
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  uuid?: string;
  reply?: ReplyType[];
};

const ProfileReply = ({reply}: Props) => {

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">All replies</h2>

      {reply && reply.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reply.map((item, index) => (
            <Card></Card>
          ))}
          </div>
      ):(
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Not found</p>
          </CardContent>
        </Card>
      )}
      </div>
  );
};

export default ProfileReply;
