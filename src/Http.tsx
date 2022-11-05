import React from "react";
import axios, { AxiosResponse } from "axios";

// モックサーバーのURL　db.json
const membersUrl = "http://localhost:3100/members";

type Member = {
  id: string;
  name: string;
};

/**
 * APIモックサーバーへのaxiosでのhttp通信テスト用コンポーネント
 */
export const HttpSample: React.VFC = () => {
  const [members, setMembers] = React.useState<Member[]>([]);

  const onFetchClick = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(membersUrl);
    setMembers(response.data);
  };

  return (
    <>
      <button onClick={onFetchClick}>
        APIモックサーバーより、membersデータ取得
      </button>
      {members.length != 0 && (
        <>
          <ul>
            {members.map((member) => (
              <li
                key={member.id}
              >{`[id]=${member.id} [name]=${member.name}`}</li>
            ))}
          </ul>
          <p> {members.length}人</p>
        </>
      )}
    </>
  );
};
