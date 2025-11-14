import TextField from "@mui/material/TextField";
import HOC from "../../hoc/HigherOrderComponent";
import Button from "@mui/material/Button";

const language = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Hindi",
    label: "Hindi",
  },
  {
    value: "Hinglish",
    label: "Hinglish",
  },
];

const tones = [
  {
    value: "Formal",
    label: "Formal",
  },
  {
    value: "Informal",
    label: "Informal",
  },
];
function HomeComponent() {
  return (
    <main>
      <form onSubmit={(e) => handleGenerate(e)}>
        <TextField
          id="outlined-basic"
          label="Receipt Name"
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Language"
          defaultValue="English"
          slotProps={{
            select: {
              native: true,
            },
          }}
          helperText="Please select your Language"
        >
          {language.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Tone"
          defaultValue="Formal"
          slotProps={{
            select: {
              native: true,
            },
          }}
          helperText="Please select your Tone"
        >
          {tones.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button variant="contained" type="submit">
          Generate
        </Button>
      </form>
      <div>Response</div>
    </main>
  );
}
export default HOC(HomeComponent);
