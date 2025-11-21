// src/pages/admin/ManageAppointments.jsx
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
  Search,
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/config.js";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Default 10, user can change
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      if (!token) {
        setError("Login as Admin to view appointments");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${BACKEND_URL}/api/appointments/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data || res.data || [];
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "patientName",
        header: "Patient",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <User size={18} className="text-primary" />
            {row.original.patientName || "-"}
          </div>
        ),
      },
      {
        accessorKey: "doctorName",
        header: "Doctor",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <Stethoscope size={18} className="text-success" />
            Dr. {row.original.doctorName || "-"}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => (
          <div className="text-muted small">
            <Calendar size={16} className="me-1" />
            {new Date(row.original.date).toLocaleDateString("en-IN")}
            <br />
            <Clock size={16} className="me-1" />
            {row.original.time}
          </div>
        ),
        sortingFn: (a, b) => {
          const dateA = new Date(a.original.date + " " + a.original.time);
          const dateB = new Date(b.original.date + " " + b.original.time);
          return dateA - dateB;
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-muted small">{row.original.email || "-"}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status?.toLowerCase();
          return (
            <Badge
              bg={
                status === "confirmed"
                  ? "success"
                  : status === "cancelled"
                  ? "danger"
                  : "warning"
              }
              className="fw-semibold"
            >
              {status === "confirmed" && <CheckCircle size={14} className="me-1" />}
              {status === "cancelled" && <XCircle size={14} className="me-1" />}
              {status === "pending" && <AlertCircle size={14} className="me-1" />}
              {(status || "pending").toUpperCase()}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: appointments,
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

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 text-muted fs-5">Loading appointments...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="display-6 fw-bold text-primary mb-1">Manage Appointments</h2>
          <p className="text-muted">All patient bookings (Admin View)</p>
        </div>
        <Badge bg="primary" className="fs-5 px-4 py-2">
          Total: {appointments.length}
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
              placeholder="Search by patient, doctor, email..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border-start-0"
              style={{ boxShadow: "none" }}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="shadow-lg border-0">
        <Card.Body className="p-0">
          {appointments.length === 0 ? (
            <Alert variant="info" className="m-4 text-center rounded">
              No appointments booked yet
            </Alert>
          ) : (
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
                        appointments.length
                      )}
                    </strong>{" "}
                    of <strong>{appointments.length}</strong> entries
                  </div>
                </div>

                {/* Previous / Next Buttons */}
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