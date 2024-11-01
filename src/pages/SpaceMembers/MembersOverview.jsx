import { React } from 'react';

import { Link } from 'react-router-dom';

import { addUserIcon } from 'src/assets';
import { Badge, Divider, Heading } from 'src/components/ui';

const MembersOverview = ({ membersData, spaceData }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex grow flex-col">
      <div className="flex justify-between">
        <Heading text="Miembros" />

        {
            (spaceData.is_admin) && (
              <Link className="self-start" to="invitar">
                <img
                  src={addUserIcon}
                  alt="add user"
                  className="size-[25px] sm:size-[36px]"
                />
              </Link>
            )
          }
      </div>

      <Divider />

      <div className="relative size-full">
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
          {
              membersData
                .map((member) => (
                  <li
                    key={member.account_id}
                    className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                  >
                    <Link
                      className="flex h-fit w-full justify-between"
                      to={`${member.account_id}`}
                    >
                      <div className="flex flex-col font-medium">
                        <div className="flex">
                          <div>
                            {member.first_name}
                          </div>
                          <div className="ml-1">
                            {member.last_name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {member.email}
                        </div>
                      </div>

                      {(member.is_admin) && (<Badge value="admin" />)}
                    </Link>
                  </li>
                ))
            }
        </ul>
      </div>
    </div>
  </div>
);

export default MembersOverview;
