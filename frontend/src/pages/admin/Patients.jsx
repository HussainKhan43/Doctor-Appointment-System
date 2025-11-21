// src/pages/admin/Patients.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Container,
  Card,
  Badge,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  User,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/config.js";

export default function Patients() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Default 10, user can change
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/contact`);
        if (res.data.success) {
          setContacts(res.data.data);
        } else {
          setError("Failed to load messages");
        }
      } catch (err) {
        setError("Server off hai kya bhai?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <User size={18} className="text-primary" />
            {row.original.fullName || "-"}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <Mail size={16} className="text-info" />
            <span className="text-muted">{row.original.email || "-"}</span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <Phone size={16} className="text-success" />
            {row.original.phone || "-"}
          </div>
        ),
      },
      {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
          <Badge bg="primary" pill className="fw-medium">
            {row.original.subject || "No Subject"}
          </Badge>
        ),
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
          <div
            style={{
              maxWidth: "300px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={row.original.message}
          >
            <MessageSquare size={14} className="me-1 text-secondary" />
            {row.original.message || "-"}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Submitted On",
        cell: ({ row }) => (
          <div className="text-muted small">
            <Calendar size={14} className="me-1" />
            {new Date(row.original.createdAt).toLocaleDateString("en-IN")}
            <br />
            {new Date(row.original.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
  });

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="display-6 fw-bold text-primary mb-1">Patient Inquiries</h2>
          <p className="text-muted">All contact form submissions</p>
        </div>
        <Badge bg="primary" className="fs-5 px-4 py-2">
          Total: {contacts.length}
        </Badge>
      </div>

      {/* Search Bar */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body className="p-3">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <Search size={18} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, email, phone, subject..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border-start-0"
              style={{ boxShadow: "none" }}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Table Card */}
      <Card className="shadow-lg border-0">
        <Card.Body className="p-0">
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading messages...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="m-4">
              {error}
            </Alert>
          )}

          {!loading && contacts.length === 0 && (
            <Alert variant="info" className="m-4 text-center rounded">
              No inquiries yet. Jab koi form bharega tab dikhega!
            </Alert>
          )}

          {!loading && contacts.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-primary text-dark">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="fw-semibold user-select-none"
                            style={{ cursor: "pointer" }}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <ArrowDown size={16} className="ms-2 text-primary" />
                              ) : (
                                <ArrowUp size={16} className="ms-2 text-primary" />
                              )
                            ) : (
                              <ArrowUpDown size={16} className="ms-2 text-muted opacity-50" />
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-3">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Advanced Pagination */}
              <div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-top bg-light gap-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {/* Rows per page */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Rows per page:</span>
                    <Form.Select
                      size="sm"
                      style={{ width: "75px" }}
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                      {[5, 10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  {/* Showing X to Y */}
                  <div className="text-muted small">
                    Showing{" "}
                    <strong>
                      {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        contacts.length
                      )}
                    </strong>{" "}
                    of <strong>{contacts.length}</strong> entries
                  </div>
                </div>

                {/* Previous / Next */}
                <div className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}