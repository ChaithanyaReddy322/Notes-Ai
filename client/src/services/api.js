import axios from "axios";
import { setUserData } from "../redux/userSlice";

// Backend URL from environment variable
const serverUrl = import.meta.env.VITE_API_URL;

/* -----------------------------
Get Current Logged User
------------------------------*/
export const getCurrentUser = async (dispatch) => {
try {
const result = await axios.get(
`${serverUrl}/api/user/currentuser`,
{ withCredentials: true }
);

```
dispatch(setUserData(result.data));
```

} catch (error) {
console.log("Get user error:", error);
}
};

/* -----------------------------
Generate AI Notes
------------------------------*/
export const generateNotes = async (payload) => {
try {
const result = await axios.post(
`${serverUrl}/api/notes/generate-notes`,
payload,
{ withCredentials: true }
);

```
return result.data;
```

} catch (error) {
console.log("Generate notes error:", error);
}
};

/* -----------------------------
Download Generated PDF
------------------------------*/
export const downloadPdf = async (result) => {
try {
const response = await axios.post(
`${serverUrl}/api/pdf/generate-pdf`,
{ result },
{
responseType: "blob",
withCredentials: true
}
);

```
const blob = new Blob([response.data], {
  type: "application/pdf"
});

const url = window.URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "ExamNotesAI.pdf";
link.click();

window.URL.revokeObjectURL(url);
```

} catch (error) {
throw new Error("PDF download failed");
}
};
