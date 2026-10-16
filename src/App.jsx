
import React, { useEffect, useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const api = "https://to-dos-api.softclub.tj/api/to-dos"

const App = () => {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editUser, setEditUser] = useState({id: 0,name: "",description: "",})
  const [selectedUser, setSelectedUser] = useState(null)

  async function getData() {
    try {
      const {data} = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  async function handleAdd(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("Name", name)
    formData.append("Description", description)
    Array.from(images).forEach((file) => {formData.append("Images", file)})
    try {
      await axios.post(api, formData)
      getData()
      setName("")
      setDescription("")
      setImages([])
      setOpen(false)
      event.target.reset()
    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleEdit(event) {
  event.preventDefault()
  try {
    await axios.put(api, {
      id: editUser.id,
      name: editUser.name,
      description: editUser.description,
    })
    getData()
    setEditOpen(false)
  } catch (error) {
    console.log(error)
  }
}

  async function handleDelete(id) {
    try {
      await axios.delete(`${api}?id=${id}`)
      getData()
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteImage(imageId) {
  try {
    await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${imageId}`)
     getData()
  } catch (error) {
    console.log(error)
  }
}

async function postImg(userImg, id) {
  try {
    const formData = new FormData()
    Array.from(userImg).forEach((file) => {
      formData.append("Images", file)
    })
    await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${id}/images`,formData)
    getData()
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div>
      <h1>To-Do List</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Add User</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleAdd}>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Ном, тавсиф ва тасвирро ворид кун.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input id="name"name="name"placeholder="Enter name"value={name}onChange={(event) =>setName(event.target.value)}required/>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input id="description"name="description"placeholder="Enter description"value={description}onChange={(event) =>setDescription(event.target.value)}required/>
              </div>
              <div className="grid gap-2">
                <Label>Images</Label>
                <Input id="images"name="images"type="file"accept="image/*" multiple onChange={(event) =>setImages(event.target.files)}required/>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
<Dialog open={editOpen} onOpenChange={setEditOpen}>
  <DialogContent>
    <form onSubmit={handleEdit}>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>Маълумоти корбарро тағйир деҳ.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input id="edit-name" value={editUser.name} onChange={(event) =>setEditUser({...editUser,name: event.target.value,})}required/>
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
          <Input id="edit-description"value={editUser.description}onChange={(event) =>setEditUser({...editUser,description: event.target.value,})}required/>
        </div>
      </div>
      <DialogFooter>
        <Button type="button"variant="outline"onClick={() => setEditOpen(false)}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

<input id="add-image" type="file" accept="image/*"multiple hidden onChange={(event) => {
    const files = event.target.files
    if (files.length > 0 && selectedUser) {postImg(files, selectedUser.id)}event.target.value = ""}}/>

      <div className="mt-6 flex flex-wrap gap-5">
        {data.map((e) => (
          <div key={e.id} className="w-80 rounded-xl border p-5 shadow-md">
           <div style={{display: "flex",justifyContent: "center",gap: "8px",flexWrap: "wrap",}}>
            {e.images?.map((img) => (
              <div key={img.id} style={{ display: "flex",flexDirection: "column", alignItems: "center",gap: "5px",}}>
                <img src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}style={{width: "90px",height: "80px",objectFit: "cover",borderRadius: "50%",}}/>
                <Button type="button"variant="destructive"onClick={() => deleteImage(img.id)}>X</Button>
                </div>
              ))}
              <Button type="button"onClick={() => {setSelectedUser(e)
                document.getElementById("add-image").click()}} >+</Button>
                </div>
                <h2>Name: {e.name}</h2>
                <p>Description: {e.description}</p>
                <p>Status: {e.isCompleted ? "Active" : "Inactive"}</p>
                <Button className="mt-4" variant="destructive" onClick={() => handleDelete(e.id)}>Delete</Button>
                <Button
                onClick={() => {
                  setEditUser({id: e.id,name: e.name,description: e.description,})
                  setEditOpen(true) }}>Edit</Button>
                  </div>
            ))}
      </div>
    </div>
  )}
export default App