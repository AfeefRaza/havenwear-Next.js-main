
import {
  Grid,
  Stack,
  TextField,
  
  Button,
} from "@mui/material";
import BaseCard from "./src/components/baseCard/BaseCard";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "./src/layouts/FullLayout";
import theme from "./src/theme/theme";
import { useState } from "react";

const add = () => {
  const [form, setForm] = useState({})
  const onChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
        footer{
          display:none;
        }
        `}
      </style>
      <FullLayout>
      <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Form Layout">
          <Stack spacing={3}>
            <TextField
            onChange={onChange}
            value={form.title?form.title:""}
              name="title"
              label="Title"
              variant="outlined"/>
            <TextField
            onChange={onChange}
            value={form.price?form.price:""}
              name="price"
              label="Price"
              variant="outlined"
              
            />
            <TextField
            onChange={onChange}
            value={form.desc?form.desc:""}
              name="desc"
              label="Description"
              variant="outlined"
              
            />
            <TextField
            onChange={onChange}
            value={form.category?form.category:""}
              name="category"
              label="Category"
              variant="outlined"
              
            />
            <TextField
            onChange={onChange}
            value={form.size?form.size:""}
              name="size"
              label="Size"
              variant="outlined"
              
            />
            <TextField
            onChange={onChange}
            value={form.color?form.color:""}
              name="color"
              label="Color"
              variant="outlined"
              
            />
            <TextField
            onChange={onChange}
            value={form.qty?form.qty:""}
              name="qty"
              label="Available Quantity"
              variant="outlined"
              
            />
           
            
            
            
           
            
          </Stack>
          <br />
          <Button onSubmit={onSubmit} variant="contained" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>

      
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default add