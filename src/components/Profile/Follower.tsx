import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';
import { FollowerType } from 'utils/types';
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  uuid?: string;
  follower?: FollowerType[];
};

const ProfileFollower = ({follower}: Props) => {
  return (
  <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">All followers</h2>

      {follower && follower.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {follower.map((item, index) => (
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

export default ProfileFollower;
