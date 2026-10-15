
import React, { useState } from "react"
import {MoreHorizontalIcon,Plus,Search,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import {Drawer,DrawerClose,DrawerContent,DrawerDescription,DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger,} from "@/components/ui/drawer"
import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"

const App = () => {
  const [data, setData] = useState([
    { id: 1, product: "Wireless Mouse", price: "29.99", category: "Electronics" },
    { id: 2, product: "Mechanical Keyboard", price: "129.99", category: "Electronics" },
    { id: 3, product: "USB-C Hub", price: "49.99", category: "Electronics" },
    { id: 4, product: "Apple", price: "2.50", category: "Fruits" },
    { id: 5, product: "Banana", price: "1.50", category: "Fruits" },
    { id: 6, product: "Carrot", price: "1.20", category: "Vegetables" },
  ])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [product, setProduct] = useState("")
  const [price, setPrice] = useState("")
  const [productCategory, setProductCategory] = useState("Electronics")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const handleAdd = () => {
    setEditId(null)
    setProduct("")
    setPrice("")
    setProductCategory("Electronics")
    setOpen(true)
  }
  const handleEdit = (item) => {
    setEditId(item.id)
    setProduct(item.product)
    setPrice(item.price)
    setProductCategory(item.category)
    setOpen(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!product.trim() || !price.trim()) {
      return
    }
    if (editId !== null) {
      setData((prev) =>prev.map((item) =>item.id === editId? {...item,product: product.trim(),price,category: productCategory,}: item))
    } else {
      const newProduct = {
        id: Date.now(),
        product: product.trim(),
        price,
        category: productCategory,
      }
      setData((prev) => [...prev, newProduct])
      setCurrentPage(1)
    }
    setOpen(false)
    setEditId(null)
    setProduct("")
    setPrice("")
  }

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }
  const filterData = data.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === "all" || item.category === category
    return matchesSearch && matchesCategory
  })
  const totalPages = Math.ceil(filterData.length / itemsPerPage)
  const safePage = Math.min(currentPage,Math.max(totalPages, 1))
  const startIndex = (safePage - 1) * itemsPerPage
  const paginatedData = filterData.slice(startIndex,startIndex + itemsPerPage)
  const changePage = (page) => {
    setCurrentPage(
      Math.max(1, Math.min(page, Math.max(totalPages, 1))))}
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Manage your products</p></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value) 
                setCurrentPage(1)}}className="pl-9 bg-white"/>
            </div>
            <Select value={category} onValueChange={(value) => {setCategory(value)
              setCurrentPage(1)}}>
              <SelectTrigger className="w-full bg-white sm:w-44">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd}>Add+</Button>
        </div>
        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{paginatedData.length > 0 ? (paginatedData.map((item) => (<TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost"size="icon"className="size-8">
                              <MoreHorizontalIcon className="h-4 w-4" /><span className="sr-only">Open menu</span></Button>}/>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(item)}>Edi</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"onClick={() => handleDelete(item.id)}>Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={4}
                    className="py-8 text-center text-gray-500">No products found</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-500">
            Showing {filterData.length === 0 ? 0 : startIndex + 1}{" - "}{Math.min(startIndex + itemsPerPage, filterData.length)} {" of "}  {filterData.length} products </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); changePage(safePage - 1)}}/>
              </PaginationItem>
              {Array.from({ length: totalPages },(_, index) => index + 1
              )
                .filter((page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - safePage) <= 1
                )
                .map((page, index, pages) => (
                  <React.Fragment key={page}>
                    {index > 0 &&
                      page - pages[index - 1] > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>)}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={safePage === page}
                        onClick={(e) => {
                          e.preventDefault()
                          changePage(page)}}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    changePage(safePage + 1)}}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId !== null ? "Edit Product": "Add Product"}
              </DialogTitle>
              <DialogDescription>{editId !== null ? "Update product information." : "Enter information for a new product."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product name</label>
                <Input placeholder="Enter product name"value={product} onChange={(e) => setProduct(e.target.value)} required/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input type="number"min="0"  step="0.01"placeholder="Enter price"value={price}onChange={(e) => setPrice(e.target.value)} required/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={productCategory}onValueChange={setProductCategory}>
                  <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Electronics"> Electronics</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button"variant="outline"onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{editId !== null ? "Save Changes" : "Add Product"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Drawer>
          <DrawerTrigger
            render={
              <Button variant="outline">Open Drawer</Button>
              }/>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Product Management</DrawerTitle>
              <DrawerDescription>You can manage products using the table above.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-center">Total products: {data.length}</div>

            <DrawerFooter>
              <DrawerClose
                render={
                  <Button variant="outline">Close</Button>
                }/>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
export default App