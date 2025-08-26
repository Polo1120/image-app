import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";

const getInitialQuery = (search: string) => {
  const params = new URLSearchParams(search);
  return params.get("q") || "";
};

const updateQueryParams = (params: URLSearchParams, query: string) => {
  if (query) {
    params.set("q", query);
  } else {
    params.delete("q");
  }
  return params.toString();
};

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState(getInitialQuery(location.search));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    const params = new URLSearchParams(location.search);
    const search = updateQueryParams(params, q);
    navigate({ pathname: "/q", search });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form-bar">
      <TextField
        color="secondary"
        size="small"
        variant="outlined"
        placeholder="Search"
        value={input}
        fullWidth
        className="search-input-bar"
        onChange={(e) => setInput(e.target.value)}
        sx={{
          background: (theme) => theme.palette.secondary.main,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" > 
              <IconButton type="submit" >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
