import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const uploadImage = createAsyncThunk(
    "upload/image",
    async ({ file, folder, onProgress }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const { data } = await axios.post(
                `/upload/image?folder=${folder}`,
                formData,
                {
                    onUploadProgress: (e) => {
                        if (onProgress) {
                            const percent = Math.round((e.loaded * 100) / e.total);
                            onProgress(percent);
                        }
                    },
                }
            );

            return data.image;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Upload failed");
        }
    }
);

export const deleteImage = createAsyncThunk(
    "upload/delete",
    async (publicId, { rejectWithValue }) => {
        try {
            await axios.delete("/upload/image", { data: { publicId } });
            return publicId;
        } catch (error) {
            return rejectWithValue("Delete failed: ", error);
        }
    }
);

const uploadSlice = createSlice({
    name: "upload",
    initialState: {
        uploading: false,
        progress: {},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.uploading = true;
            })
            .addCase(uploadImage.fulfilled, (state) => {
                state.uploading = false;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
            });
    },
});

export default uploadSlice.reducer;