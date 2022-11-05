import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss";
// import data from "./Data.json";
import axios, { AxiosResponse } from "axios";

export default function Table() {
  // ボーダーの設定
  const border: number = 1;

  // テーブル結合
  const colSpan: number = 3;
  // モックサーバーのURL　db.json
  const membersUrl = "http://localhost:3100/member";

  type Member = {
    id: number;
    name: string;
    age: number;
  };

  const [member, setMember] = React.useState<Member[]>([]);

  const onFetchClick = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(membersUrl);
    setMember(response.data);
  };

  useEffect(() => {
    onFetchClick();
  }, []);

  // Jsonの型一覧を定義
  interface elm {
    id: number;
    name: string;
    age: number;
  }

  // 「↑」ボタンを押した時の挙動
  const upRow = (index: number) => {
    if (index === 0) {
      return;
    }

    const newData: any = [...member];
    [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
    setMember(newData);
  };

  // 「↓」ボタンを押した時の挙動
  const downRow = (index: number) => {
    if (index >= member.length - 1) {
      return;
    }

    const newData: any = [...member];
    [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
    setMember(newData);
  };

  // 削除ボタンを押したときの挙動
  const deleteRow = (index: number) => {
    const data = [...member];
    data.splice(index, 1);
    setMember(data);
  };

  // 追加ボタンを押したときの挙動
  const createRow = () => {
    const idData: any = document.getElementById("id");
    const nameData: any = document.getElementById("name");
    const ageData: any = document.getElementById("age");

    if (idData.value && nameData.value && ageData.value) {
      if (!isNaN(Number(idData.value)) && !isNaN(Number(ageData.value))) {
        const newData: any = {
          id: Number(idData.value),
          name: nameData.value,
          age: Number(ageData.value),
        };
        const data = [...member];
        data.push(newData);
        setMember(data);
      }
    }
  };

  return (
    <div>
      <table border={border} className={classes.tableStyle}>
        <thead>
          <tr>
            <th className={classes.rowStyle}>ID</th>
            <th className={classes.rowStyle}>Name</th>
            <th className={classes.rowStyle}>Age</th>
            <th colSpan={colSpan} className={classes.rowStyle}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {member.map((elm: elm, index: number) => (
            <tr key={index}>
              <td>{elm.id}</td>
              <td>{elm.name}</td>
              <td>{elm.age}</td>
              <td>
                <button
                  onClick={() => deleteRow(index)}
                  className={classes.deleteButtonStyle}
                >
                  削除
                </button>
              </td>
              <td>
                <button onClick={() => upRow(index)}>↑</button>
              </td>
              <td>
                <button onClick={() => downRow(index)}>↓</button>
              </td>
            </tr>
          ))}

          <tr>
            <td>
              <input
                type="text"
                className={classes.textBoxStyle}
                id="id"
                placeholder="IDを入力"
              />
            </td>
            <td>
              <input
                type="text"
                className={classes.textBoxStyle}
                id="name"
                placeholder="名前を入力"
              />
            </td>
            <td>
              <input
                type="text"
                className={classes.textBoxStyle}
                id="age"
                placeholder="年齢を入力"
              />
            </td>
            <td>
              <button
                onClick={() => createRow()}
                className={classes.addButtonStyle}
              >
                追加
              </button>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
