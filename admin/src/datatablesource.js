import moment from "moment";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },

  {
    field: "role",
    headerName: "Role",
    width: 100,
  },

  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data of user


export const pitchColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "Name",
    width: 150,
  },

  {
    field: "address",
    headerName: "Address",
    width: 140,
  },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "district",
    headerName: "District",
    width: 100,
  },

];

export const childPitchColumns = [
  
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 250,
    valueFormatter: params =>
    moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
];