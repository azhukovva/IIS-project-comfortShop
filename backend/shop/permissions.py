from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "admin"
        return request.user.groups.filter(name="admin").exists()


class IsModeratorUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "moderator"
        return request.user.groups.filter(name="moderator").exists()
    
