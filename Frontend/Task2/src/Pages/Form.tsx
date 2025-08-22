import { useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Button, Container, Paper, Typography, IconButton, Chip } from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";
import axios from "axios";
const roles = ["Developer", "QA", "DBA", "AI/ML Developer"];

const Form = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [experiences, setExperiences] = useState([{ role: "", description: "" }]);


    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState<string[]>([]);


    const handleExperienceChange = (
        index: number,
        field: "role" | "description",
        value: string
    ) => {
        const newExperiences = [...experiences];
        newExperiences[index][field] = value;
        setExperiences(newExperiences);
    };

    const addExperience = () => {
        setExperiences([...experiences, { role: "", description: "" }]);
    };

    const removeExperience = (index: number) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(newExperiences);
    };


    const addSkill = () => {
        if (skill.trim() !== "" && !skills.includes(skill.trim())) {
            setSkills([...skills, skill.trim()]);
            setSkill("");
        }
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/submit", {
                name,
                email,
                experiences,
                skills
            });

            alert("Form submitted successfully");
            console.log("Response:", response.data);
        } catch (error: any) {
            console.error("Error submitting form:", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, m: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Job Form
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <TextField label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <TextField label="Email" variant="outlined" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                         


                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <InputLabel>Experience</InputLabel>
                            {experiences.map((exp, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        p: 2,
                                        border: "1px solid #ddd",
                                        borderRadius: 2
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={exp.role}
                                            onChange={(e) =>
                                                handleExperienceChange(index, "role", e.target.value)
                                            }
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        label="Experience Description"
                                        value={exp.description}
                                        onChange={(e) =>
                                            handleExperienceChange(index, "description", e.target.value)
                                        }
                                    />

                                    {index > 0 && (
                                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            <IconButton color="error" onClick={() => removeExperience(index)}>
                                                <Remove />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        <Button startIcon={<Add />} onClick={addExperience} variant="outlined">
                            Add More
                        </Button>


                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <InputLabel>Skills</InputLabel>
                            <TextField
                                label="Enter Your Skills"
                                variant="outlined"
                                placeholder="e.g. React, Node.js"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={addSkill} color="primary">
                                            <Add />
                                        </IconButton>
                                    )
                                }}
                            />


                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                                {skills.map((s, index) => (
                                    <Chip
                                        key={index}
                                        label={s}
                                        onDelete={() => removeSkill(index)}
                                        deleteIcon={<Close />}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;
